import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const MAX_WIDTH = 6;
const MAX_HEIGHT = 6;

function Square(props) {
  return (
    <button className={props.visibility ? 'square visible' : 'square invisible'}
    onClick={props.onClick}> 
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  visibleSquare(x,y) {
    const squares = this.props.squares;
    return [-1,0,1].map(dx =>
      [-1,0,1].map(dy => {
        const tx = x + dx;
        const ty = y + dy;
        if (ty < 0 || ty > MAX_HEIGHT*2-2 || tx < 0 || tx > MAX_WIDTH*2-2)
          return false;
        return squares[tx][ty] != null;
      })
    )
    .reduce((a,c) => a.concat(c))
    .reduce((a,c) => a || c);
  }

  renderSquare(x,y) {
    if (this.visibleSquare(x,y)) {
      return (
        <Square
          value={this.props.squares[x][y]}
          visibility={true}
          onClick={() => this.props.onClick(x,y)}
        />
      );
    } else {
      return (
        <Square
          value="" visibility={false}
          onClick={() => true}
        />
      );      
    }
  }

  numRange() {
    return this.props.squares.keys();
  }

  render() {
    const rows = Array.from(this.numRange()).map(x => 
      <div className="board-row" key="{x}">
        { Array.from(this.numRange()).map(y => 
          this.renderSquare(x,y)
          )
        }
      </div>
      );

    return (
      <div>
        {rows}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(MAX_WIDTH*2 - 1).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
    // have to init 2D array this way; if you nest it in the hash literal
    // above, you get the same array referenced in every row
    for (let x=0; x < MAX_WIDTH*2 - 1; x++)
      this.state.history[0].squares[x] = Array(MAX_HEIGHT*2 - 1).fill(null);
    // place first move in the center
    this.state.history[0].squares[MAX_WIDTH-1][MAX_HEIGHT-1] = "X";
  }

  handleClick(x,y) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.map(function(arr) {
      return arr.slice();
    });
    if (calculateWinner(squares) || squares[x][y]) {
      return;
    }
    squares[x][y] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={(x,y) => this.handleClick(x,y)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

ReactDOM.render(<Game />, document.getElementById("root"));
