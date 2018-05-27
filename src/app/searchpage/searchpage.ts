export interface SearchPage {
    Blogger: string,
    Description: string,
    UpdatedDate: string,
    LanguageDetected: string,
    PostURL: string,
    Title: string,
    ImageExt: string,
    Tags: string[],
    _score: number,
    RatingLikes: number,
    OurFavourite: boolean,
    BloggerImage: string,
    BloggerImage_15: string,
    ThumbnailImage: string,
    Places: [
        {
            Priority: number,
            AdditionalSalience: number,
            AdditionalWikidata: string,
            Sequence: number,
            CountryCode: string,
            LocationType: string,
            GeoNamesID: string,
            Source: string,
            LocationName: string,
            AdditionalMid: string,
            Location: string
        }
    ],
    Topics: string[],
    FilterFeatures: string[],
    ReadingTime: number,
    BlogTitle: string,
    BlogDescription: string
}