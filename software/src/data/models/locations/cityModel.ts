/**
 * Replica of the API endpoint /cities
 */
export class CityModel {
  id: number = -1
  name: string = ""
  country: string = ""
  image: string = ""
  locations: Array<{
    id: number
    name: string
    address: string
    imageIndoor: string
    imageOutdoor: string
    nrOfConcerts: number
  }> = [{
    id: -1,
    name: "",
    address: "",
    imageIndoor: "",
    imageOutdoor: "",
    nrOfConcerts: 0
  }]
}