export interface VideoStats {
    kind:     string;
    etag:     string;
    items:    Item[];
    pageInfo: PageInfo;
}

export interface Item {
    kind:       string;
    etag:       string;
    id:         string;
    statistics: Statistics;
}

export interface Statistics {
    viewCount:     string;
    likeCount:     string;
    favoriteCount: string;
    commentCount:  string;
}

export interface PageInfo {
    totalResults:   number;
    resultsPerPage: number;
}