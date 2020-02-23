import React from "react";
import "./styles.css";
import { func } from "prop-types";

const CATEGORIES = {
  Addition: Addition,
  Subtraction: Subtraction,
  Multiplication: Multiplication,
  Division: Division
};

const PREFERENCE = {
  addition: {
    min: 0,
    max: 99
  },
  subtraction: {
    min: 0,
    max: 99
  },
  multiplication: {
    min: 0,
    max: 10
  },
  division: {
    min: 0,
    max: 10
  }
};

export default function App() {
  const [category, setCategory] = React.useState("Addition");
  const CategoryComponent = CATEGORIES[category];

  return (
    <div className="App">
      <nav className="main-nav">
        {Object.keys(CATEGORIES).map(cat => (
          <li key={cat} onClick={() => setCategory(cat)}>
            {cat}
          </li>
        ))}
      </nav>

      <div className="category-board">
        <h1>{category}</h1>
        {CategoryComponent && <CategoryComponent />}
      </div>
    </div>
  );
}

function Primary2Math({ category, initialProblem, nextProblemGenerator }) {
  const [problem, setProblem] = React.useState(initialProblem);
  const nextProblem = () => setProblem(nextProblemGenerator());

  return (
    <div className={`MathBoard ${category}`}>
      <span>
        {problem.op1} {problem.operator} {problem.op2} =
      </span>
      {/* Cheating with the key for now */}
      <AnswerBox key={problem.id()} expected={problem.answer()} />
      <div>
        <button className="MathNextProblem" onClick={nextProblem}>
          Next problem
        </button>
      </div>
    </div>
  );
}

function AnswerBox({ expected }) {
  const [answer, setAnswer] = React.useState(undefined);
  const isCorrect = answer === `${expected}`;
  const className = answer === undefined ? "" : isCorrect ? "correct" : "wrong";

  return (
    <div className="MathAnswerBox">
      <input
        type="number"
        className={className}
        placeholder={answer === undefined ? "?" : answer}
        value={answer === undefined ? "" : answer}
        readOnly={false}
        onChange={e => setAnswer(e.target.value)}
      />
      {answer !== undefined && (
        <span className="MathAnswerCheck">
          {isCorrect ? "✓ Correct" : "✗ Wrong"}
        </span>
      )}
    </div>
  );
}

function TODO() {
  return "oops, not yet implemented";
}

function Division() {
  const initialProblem = {
    op1: 2,
    op2: 1,
    operator: "÷",
    answer: function() {
      return this.op1 / this.op2;
    },
    id: function() {
      return this.answer();
    }
  };
  const nextProblemGenerator = () => {
    const op2 = getRandomInt(PREFERENCE.division.max);
    const op1 = getRandomInt(PREFERENCE.division.max) * op2;
    return {
      ...initialProblem,
      op1,
      op2
    };
  };
  return (
    <Primary2Math
      category="Multiplication"
      initialProblem={initialProblem}
      nextProblemGenerator={nextProblemGenerator}
    />
  );
}

function Multiplication() {
  const initialProblem = {
    op1: 2,
    op2: 1,
    operator: "x",
    answer: function() {
      return this.op1 * this.op2;
    },
    id: function() {
      return this.answer();
    }
  };
  const nextProblemGenerator = () => {
    const op1 = getRandomInt(PREFERENCE.multiplication.max);
    const op2 = getRandomInt(PREFERENCE.multiplication.max);
    return {
      ...initialProblem,
      op1,
      op2
    };
  };
  return (
    <Primary2Math
      category="Multiplication"
      initialProblem={initialProblem}
      nextProblemGenerator={nextProblemGenerator}
    />
  );
}

function Subtraction() {
  const initialProblem = {
    op1: 2,
    op2: 1,
    operator: "-",
    answer: function() {
      return this.op1 - this.op2;
    },
    id: function() {
      return this.answer();
    }
  };
  const nextProblemGenerator = () => {
    const op1 = getRandomInt(PREFERENCE.subtraction.max);
    const op2 = getRandomInt(op1);
    return {
      ...initialProblem,
      op1,
      op2
    };
  };
  return (
    <Primary2Math
      category="Subtraction"
      initialProblem={initialProblem}
      nextProblemGenerator={nextProblemGenerator}
    />
  );
}

function Addition() {
  const initialProblem = {
    op1: 1,
    op2: 2,
    operator: "+",
    answer: function() {
      return this.op1 + this.op2;
    },
    id: function() {
      return this.answer();
    }
  };
  const nextProblemGenerator = () => ({
    ...initialProblem,
    op1: getRandomInt(PREFERENCE.addition.max),
    op2: getRandomInt(PREFERENCE.addition.max)
  });

  return (
    <Primary2Math
      category="Addition"
      initialProblem={initialProblem}
      nextProblemGenerator={nextProblemGenerator}
    />
  );
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
