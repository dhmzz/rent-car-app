export interface carsResponse{
    car_id: number
    brand: string
    model: string
    plate_number: string
    rental_rate_per_day: string
    available: number
}

export interface carsRequestAdd{
    brand: string,
    model: string,
    plate_number: string,
    rental_rate_per_day: number,
    available: boolean
}