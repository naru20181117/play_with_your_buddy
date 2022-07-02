import Data from './../src/data/dog_kind.json';

export async function calculateNumber(data) {
  var averageLifeSpan = Data.find((d) => d.value === data.animalKind)['average-life-span'];
  var restOfLife = averageLifeSpan - data.petAge;
  if (Math.sign(restOfLife) === -1) {
    var resultNum = restOfLife;
  } else {
    // （平均寿命 - 現在の年齢）* 年に遊ぶ回数
    var resultNum = restOfLife * data.numberOfPlay;
  }
  // 小数点2桁までを表示
  return resultNum.toFixed(1);
}
