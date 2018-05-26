export interface SearchDetails{
    Title: string,
    Blogger: string,
    UpdatedDate: string,
    LanguageDetected: string,
    ImageExt: string,
    Tags: string[],
    PostURL: string,
    Description: string,
    RatingLikes: number,
    BloggerImage: string,
    ThumbnailImage: string,
    Places: [{
        Priority: number,
        GeoNamesID: string,
        LocationName: string,
        Location: string
    }],
    Topics: string[],
    ReadingTime: number,
    BlogTitle: string,
    BlogDescription: string,
    OurFavourite: boolean
}