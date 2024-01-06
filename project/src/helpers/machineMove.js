const machineMove = (square) => {
  console.log(square);
  if (square[0] == "O" && square[1] == "O" && square[2] == "") return 2;
  if (square[0] == "O" && square[1] == "" && square[2] == "O") return 1;
  if (square[0] == "" && square[1] == "O" && square[2] == "O") return 0;

  if (square[3] == "O" && square[4] == "O" && square[5] == "") return 5;
  if (square[3] == "O" && square[4] == "" && square[5] == "O") return 4;
  if (square[3] == "" && square[4] == "O" && square[5] == "O") return 3;

  if (square[6] == "O" && square[7] == "O" && square[8] == "") return 6;
  if (square[6] == "O" && square[7] == "" && square[8] == "O") return 7;
  if (square[6] == "" && square[7] == "O" && square[8] == "O") return 6;

  if (square[0] == "O" && square[4] == "O" && square[8] == "") return 8;
  if (square[2] == "O" && square[4] == "O" && square[6] == "") return 6;

  if (square[0] == "O" && square[4] == "" && square[8] == "O") return 4;
  if (square[2] == "O" && square[4] == "" && square[6] == "O") return 4;

  if (square[0] == "" && square[4] == "O" && square[8] == "O") return 0;
  if (square[2] == "" && square[4] == "O" && square[6] == "O") return 2;

  const filteredSquare = square.filter((squareValue) => squareValue == "");
  return filteredSquare[Math.floor(Math.random() * filteredSquare.length)];
};

export default machineMove;
