export interface TravelArticle {
    Title: string,
    Places: [
        {
            PlaceName:string,
            PlaceID: number
        }
    ],
    isSticky: boolean,
    AbstractText: string,
    ArticleName: string,
    FeatureImageThumbnail: string,
    Category: string,
    Likes: number,
    PublishedDate: string,
    Tags: string[]
}