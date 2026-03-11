export function cumulativeSaving(production:number,price:number){

return production*price

}

export function totalSaving25Years(productionArray: Array<{value: number}>, price: number): number {

let total=0

productionArray.forEach(p=>{
total+=p.value*price
})

return total

}