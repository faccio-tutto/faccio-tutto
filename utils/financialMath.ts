export function annualSaving(selfConsumption:number,energyPrice:number){

return selfConsumption*energyPrice

}

export function payback(cost:number,saving:number){

if(!saving) return 0

return cost/saving

}

export function roi(cost:number,saving:number){

return (saving/cost)*100

}