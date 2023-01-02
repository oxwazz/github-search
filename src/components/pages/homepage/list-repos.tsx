import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUserRepos } from "../../../requests/fetch-user-repos";
import { SkeletonLoading } from "../../elements/skeleton-loading";
import { StarIcon } from "@heroicons/react/24/solid";

type Props = {
  username: string;
};

const PER_PAGE = 4;
export function ListRepos(props: Props) {
  const fetchUserReposInfitineQuery = useInfiniteQuery(
    ["fetchUserReposInfitineQuery", { search: props.username }],
    (params) =>
      fetchUserRepos({
        username: props.username,
        page: params.pageParam,
      }),
    {
      staleTime: 1000 * 60 * 60, // 1 hour
      enabled: !!props.username,
      // getNextPageParam: (lastPage, pages) => {
      //   console.log(lastPage, pages);
      //   if (
      //     pages.length * PER_PAGE >=
      //     (fetchSearchReposQuery.data?.total_count || 0)
      //   )
      //     return undefined;
      //   return pages.length + 1;
      // },
    }
  );

  const handleLoadMore = () => {
    if (!fetchUserReposInfitineQuery.hasNextPage) {
      return;
    }
    fetchUserReposInfitineQuery.fetchNextPage();
  };

  return (
    <>
      {!fetchUserReposInfitineQuery.isLoading &&
        (fetchUserReposInfitineQuery.data?.pages?.[0]?.length || 0) === 0 && (
          <div className="text-center col-span-full	">
            <p>{props.username} doesn't have a repository</p>
          </div>
        )}

      {fetchUserReposInfitineQuery.isLoading &&
        [...new Array(PER_PAGE)].map((_, i) => {
          return <SkeletonLoading key={i} className="h-[180px] w-full" />;
        })}

      {fetchUserReposInfitineQuery.data?.pages.map((page) => {
        return page?.map((repo, i) => {
          return (
            <div
              key={repo?.name}
              className="card 2-full bg-base-100 shadow-xl hover:scale-105 transition-all"
            >
              <div className="card-body relative">
                <div className="absolute top-5 right-8 flex gap-2">
                  <p className="text-indigo-500/70">{repo.stargazers_count}</p>
                  <StarIcon className="w-5 text-indigo-500/70" />
                </div>
                <h2 className="text-gray-500 card-title">{repo?.name || ""}</h2>
                <p className="text-gray-500 line-clamp-3">
                  {repo?.description || ""}
                </p>
                <div className="card-actions justify-end">
                  <a
                    href={repo.html_url}
                    rel="noreferrer"
                    target="_blank"
                    className="btn btn-primary"
                  >
                    visit
                  </a>
                </div>
              </div>
            </div>
          );
        });
      })}

      {fetchUserReposInfitineQuery.hasNextPage && (
        <button
          className={[
            "btn btn-primary",
            fetchUserReposInfitineQuery.isFetchingNextPage ? "loading" : "",
          ].join(" ")}
          onClick={handleLoadMore}
          disabled={fetchUserReposInfitineQuery.isFetchingNextPage}
        >
          load more
        </button>
      )}
    </>
  );
}
