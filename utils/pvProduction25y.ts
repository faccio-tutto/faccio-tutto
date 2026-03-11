export function production25Years(initialProduction:number){

const degradation=0.005

let production=[]

let current=initialProduction

for(let year=1;year<=25;year++){

production.push({
year,
value:current
})

current=current*(1-degradation)

}

return production

}