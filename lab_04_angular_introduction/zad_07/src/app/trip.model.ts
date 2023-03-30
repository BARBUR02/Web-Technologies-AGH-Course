export class Trip{
        name: string;
        destination:string;
        places: number;
        startDate:string;
        endDate:string;
        price: number;
        currency:string;
        description:string;
        img:string;

        constructor(val: {name: string,
        destination:string,
        places: number,
        startDate:string,
        endDate:string,
        price: number,
        description:string,
        img:string}){
                this.name=val.name,
                this.destination=val.destination,
                this.places=val.places,
                this.startDate=val.startDate,
                this.endDate=val.endDate,
                this.price=val.price,
                this.description=val.description
                this.currency='$',
                this.img=val.img
        }
}