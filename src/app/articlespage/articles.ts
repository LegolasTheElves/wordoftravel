export interface TravelArticles {
    Title: string,
    Places: {
        wrapperName: string,
        values: string[],
        type: string
    },
    isSticky: boolean,
    AbstractText: string,
    FeatureImageThumbnail: string,
    Category: string,
    Likes: number,
    PublishedDate: string,
    Tags: {
        wrapperName: string,
        values: string[],
        type: string
    }
}