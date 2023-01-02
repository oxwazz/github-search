import React, { useEffect, useState } from "react";
import { fetchSearchUsers } from "../../../requests/fetch-search-users";
import { useQuery } from "@tanstack/react-query";
import { ListRepos } from "./list-repos";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { SkeletonLoading } from "../../elements/skeleton-loading";

type Inputs = {
  search: string;
};

const USER_LIMIT = 5;

function Index() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, setValue } = useForm<Inputs>();
  const [searchText, setSearchText] = useState("");

  const fetchSearchUsersQuery = useQuery(
    ["fetchSearchUsersQuery", { search: searchText, perPage: USER_LIMIT }],
    () => fetchSearchUsers({ search: searchText, perPage: USER_LIMIT }),
    {
      enabled: !!searchText,
      staleTime: 1000 * 60 * 60, // 1 hour
    }
  );

  const isLoading =
    fetchSearchUsersQuery.isInitialLoading && fetchSearchUsersQuery.isLoading;

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(search);
    const search_ = urlSearchParams.get("search");
    setValue("search", search_ || "");
    setSearchText(search_ || "");
  }, []);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    navigate(`/?search=${data.search}`);
    setSearchText(data.search?.trim());
  };

  return (
    <>
      <div>
        <form
          className="flex flex-col p-4 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Type github username here"
            className="input input-bordered w-full"
            {...register("search")}
          />
          <button
            type="submit"
            className={[
              "btn btn-primary w-full",
              isLoading ? "loading" : "",
            ].join(" ")}
            disabled={!watch("search") || isLoading}
          >
            Search
          </button>
        </form>
      </div>

      {isLoading && <p className="p-4 text-gray-500">Loading...</p>}

      {!isLoading &&
        (fetchSearchUsersQuery?.data?.items?.length || 0) >= 1 &&
        searchText && (
          <p className="p-4 text-gray-500">Showing users for "{searchText}"</p>
        )}

      {!isLoading &&
        (fetchSearchUsersQuery?.data?.items?.length || 0) === 0 &&
        searchText && (
          <p className="p-4 text-gray-500">User "{searchText}" not found</p>
        )}

      {isLoading && (
        <div className="flex flex-col gap-2 mb-4">
          {[...new Array(USER_LIMIT)].map((_, i) => {
            return (
              <div key={i} className="px-4">
                <SkeletonLoading className="h-[60px] w-full" />
              </div>
            );
          })}
        </div>
      )}

      <div className="flex flex-col gap-2 mb-4">
        {fetchSearchUsersQuery.data?.items?.map((item, i) => {
          return (
            <div
              key={i}
              className="collapse px-4 collapse-arrow overflow-visible"
            >
              <input type="checkbox" className="peer sticky top-0 z-20" />
              <div className="z-10 rounded-lg sticky top-0 collapse-title bg-gray-400 text-primary-content peer-checked:rounded-b-none  peer-checked:bg-primary peer-checked:text-primary-content flex items-center gap-4">
                <div className="avatar">
                  <div className="w-6 rounded-lg">
                    <img src={item.avatar_url} alt="avatar" />
                  </div>
                </div>
                {item.login}
              </div>
              <div className="collapse-content bg-gray-400 text-primary-content peer-checked:bg-primary/40 rounded-b-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 peer-checked:pt-4 lg:grid-cols-4 gap-4">
                <ListRepos username={item.login} />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Index;
