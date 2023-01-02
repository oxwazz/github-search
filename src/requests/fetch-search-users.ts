import { Octokit } from "octokit";
import queryString from "query-string";

export interface TFetchSearchUsersFnProps {
  search: string;
  page?: number;
  perPage?: number;
  sortField?: "followers" | "repositories" | "joined";
  sortOrder?: "desc" | "asc";
}

export type TFetchSearchUsersFnResult = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<{
    login: string; // "oxwazz";
    id: number; // 58234878;
    node_id: string; // "MDQ6VXNlcjU4MjM0ODc4";
    avatar_url: string; // "https://avatars.githubusercontent.com/u/58234878?v=4";
    gravatar_id: string; // "";
    url: string; // "https://api.github.com/users/oxwazz";
    html_url: string; // "https://github.com/oxwazz";
    followers_url: string; // "https://api.github.com/users/oxwazz/followers";
    following_url: string; // "https://api.github.com/users/oxwazz/following{/other_user}";
    gists_url: string; // "https://api.github.com/users/oxwazz/gists{/gist_id}";
    starred_url: string; // "https://api.github.com/users/oxwazz/starred{/owner}{/repo}";
    subscriptions_url: string; // "https://api.github.com/users/oxwazz/subscriptions";
    organizations_url: string; // "https://api.github.com/users/oxwazz/orgs";
    repos_url: string; // "https://api.github.com/users/oxwazz/repos";
    events_url: string; // "https://api.github.com/users/oxwazz/events{/privacy}";
    received_events_url: string; // "https://api.github.com/users/oxwazz/received_events";
    type: string; // "User";
    site_admin: boolean;
    score: number; // 1;
  }>;
};
export type TFetchSearchUsersFn = (
  props: TFetchSearchUsersFnProps
) => Promise<TFetchSearchUsersFnResult>;
export const fetchSearchUsers: TFetchSearchUsersFn = async (props) => {
  const octokit = new Octokit({
    auth: "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",
  });

  const query = queryString.stringify({
    q: props.search,
    page: props.page,
    per_page: props.perPage,
    sort: props.sortField,
    order: props.sortOrder,
  });

  const res = await octokit.request(`GET /search/users?${query}`, {});
  return res.data;
};
