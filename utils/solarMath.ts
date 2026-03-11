export function calcSystemPower(panelPower:number,count:number){

return (panelPower*count)/1000

}

export function yearlyProduction(systemKw:number,irradiation:number){

return systemKw*irradiation

}

export function selfConsumption(prod:number,withBattery:boolean){

const rate=withBattery?0.7:0.35

return prod*rate

}