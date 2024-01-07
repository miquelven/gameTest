const machineMove = (square) => {
  // horizontal
  if (square[0] == "O" && square[1] == "O" && square[2] == "") return 2;
  if (square[0] == "O" && square[1] == "" && square[2] == "O") return 1;
  if (square[0] == "" && square[1] == "O" && square[2] == "O") return 0;

  if (square[3] == "O" && square[4] == "O" && square[5] == "") return 5;
  if (square[3] == "O" && square[4] == "" && square[5] == "O") return 4;
  if (square[3] == "" && square[4] == "O" && square[5] == "O") return 3;

  if (square[6] == "O" && square[7] == "O" && square[8] == "") return 6;
  if (square[6] == "O" && square[7] == "" && square[8] == "O") return 7;
  if (square[6] == "" && square[7] == "O" && square[8] == "O") return 6;

  // diagonal
  if (square[0] == "O" && square[4] == "O" && square[8] == "") return 8;
  if (square[0] == "O" && square[4] == "" && square[8] == "O") return 4;
  if (square[0] == "" && square[4] == "O" && square[8] == "O") return 0;

  if (square[2] == "O" && square[4] == "O" && square[6] == "") return 6;
  if (square[2] == "O" && square[4] == "" && square[6] == "O") return 4;
  if (square[2] == "" && square[4] == "O" && square[6] == "O") return 2;

  // vertical
  if (square[0] == "O" && square[3] == "O" && square[6] == "") return 6;
  if (square[0] == "O" && square[3] == "" && square[6] == "O") return 3;
  if (square[0] == "" && square[3] == "O" && square[6] == "O") return 0;

  if (square[1] == "O" && square[4] == "O" && square[7] == "") return 7;
  if (square[1] == "O" && square[4] == "" && square[7] == "O") return 4;
  if (square[1] == "" && square[4] == "O" && square[7] == "O") return 1;

  if (square[2] == "O" && square[5] == "O" && square[8] == "") return 8;
  if (square[2] == "O" && square[5] == "" && square[8] == "O") return 5;
  if (square[2] == "" && square[5] == "O" && square[8] == "O") return 2;

  // jogada aleatoria caso não tenha parado em nenhuma condição
  console.log("passou");
  const filteredSquare = square.filter((squareValue) => squareValue == "");
  let posSquare = [];
  for (let i = 0; i < filteredSquare.length; i++) {
    if (square[i] == "") posSquare.push(i);
  }

  const randomPosSquareMachine = Math.floor(Math.random() * posSquare.length);
  return posSquare[randomPosSquareMachine];
};

export default machineMove;
