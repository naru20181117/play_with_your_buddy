export async function calculateNumber(data) {
  var resultNum = 0;
  if (data.animalKind === 'shiba') {
    resultNum = (12 - data.petAge) * data.numberOfPlay;
  };
  return resultNum;
}
