export type recette = {
    secretKey?: string,
    title : string,
    type : string,
    text : string,
    ingredients : string[],
    prix : number,
    prepDuration : number,
    nbPersonnes : number,
    imgName: string
}