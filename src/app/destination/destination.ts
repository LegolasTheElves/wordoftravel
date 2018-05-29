export interface Destination{
		RegionName: string,
		ImagePath: string,
		RegionDescription: string,
		Countries: [
			{
				TravelAdvice: string,
				CountryName: string,
				CountryCode: string,
				Priority: 1,
				ImagePath: "",
				CountryDescription: "",
				Show: boolean
            }
        ]
}