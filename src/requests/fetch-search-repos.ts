import { Octokit } from "octokit";
import queryString from "query-string";

export interface TFetchSearchReposFnProps {
  search: string;
  page?: number;
  perPage?: number;
  sortField?: "stars" | "forks" | "help-wanted-issues" | "updated";
  sortOrder?: "desc" | "asc";
}

export type TFetchSearchReposFnResult = {
  total_count: number;
  incomplete_results: boolean;
  items: Array<{
    id: number;
    node_id: string; // "MDEwOlJlcG9zaXRvcnkyOTg1NzgzNjc=";
    name: string; // "oxwazz";
    full_name: string; // "oxwazz/oxwazz";
    private: boolean;
    owner: {
      login: string; // "oxwazz";
      id: number;
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
    };
    html_url: string; // "https://github.com/oxwazz/oxwazz";
    description: string; // "Github Profile";
    fork: boolean;
    url: string; // "https://api.github.com/repos/oxwazz/oxwazz";
    forks_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/forks";
    keys_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/keys{/key_id}";
    collaborators_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/collaborators{/collaborator}";
    teams_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/teams";
    hooks_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/hooks";
    issue_events_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/issues/events{/number}";
    events_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/events";
    assignees_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/assignees{/user}";
    branches_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/branches{/branch}";
    tags_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/tags";
    blobs_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/git/blobs{/sha}";
    git_tags_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/git/tags{/sha}";
    git_refs_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/git/refs{/sha}";
    trees_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/git/trees{/sha}";
    statuses_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/statuses/{sha}";
    languages_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/languages";
    stargazers_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/stargazers";
    contributors_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/contributors";
    subscribers_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/subscribers";
    subscription_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/subscription";
    commits_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/commits{/sha}";
    git_commits_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/git/commits{/sha}";
    comments_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/comments{/number}";
    issue_comment_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/issues/comments{/number}";
    contents_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/contents/{+path}";
    compare_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/compare/{base}...{head}";
    merges_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/merges";
    archive_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/{archive_format}{/ref}";
    downloads_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/downloads";
    issues_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/issues{/number}";
    pulls_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/pulls{/number}";
    milestones_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/milestones{/number}";
    notifications_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/notifications{?since,all,participating}";
    labels_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/labels{/name}";
    releases_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/releases{/id}";
    deployments_url: string; // "https://api.github.com/repos/oxwazz/oxwazz/deployments";
    created_at: string; // "2020-09-25T13:19:32Z";
    updated_at: string; // "2022-12-22T23:27:20Z";
    pushed_at: string; // "2022-12-22T23:27:17Z";
    git_url: string; // "git://github.com/oxwazz/oxwazz.git";
    ssh_url: string; // "git@github.com:oxwazz/oxwazz.git";
    clone_url: string; // "https://github.com/oxwazz/oxwazz.git";
    svn_url: string; // "https://github.com/oxwazz/oxwazz";
    homepage: string; // "";
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string | null;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: string | null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: string | null;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: any[];
    visibility: string; // "public";
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string; // "master";
    permissions: {
      admin: boolean;
      maintain: boolean;
      push: boolean;
      triage: boolean;
      pull: boolean;
    };
    score: number;
  }>;
};
export type TFetchSearchReposFn = (
  props: TFetchSearchReposFnProps
) => Promise<TFetchSearchReposFnResult>;
export const fetchSearchRepos: TFetchSearchReposFn = async (props) => {
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

  const res = await octokit.request(`GET /search/repositories?${query}`, {});
  return res.data;
};
