import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const [history, setHistory] = useState([]); // Estado para el historial

  // Función para manejar los números
  const handleNumberClick = (num) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
    setExpression(expression + num);
  };

  // Función para manejar los operadores
  const handleOperatorClick = (operator) => {
    setDisplay(operator);
    setExpression(expression + operator);
  };

  // Función para manejar el punto decimal
  const handleDecimalClick = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setExpression(expression + '.');
    }
  };

  // Función para manejar el botón "C" (Clear)
  const handleClearClick = () => {
    setDisplay('0');
    setExpression('');
  };

  // Función para manejar el botón "=" (Igual)
  const handleEqualsClick = () => {
    try {
      const result = eval(expression); // Calcula el resultado
      setDisplay(result.toString());
      setExpression(result.toString());
      // Agrega la operación al historial
      setHistory([...history, { expression, result }]);
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };

  // Función para manejar el botón "Borrar" (Backspace)
  const handleBackspaceClick = () => {
    setDisplay(display.slice(0, -1) || '0');
    setExpression(expression.slice(0, -1));
  };

  // Función para manejar el botón "+/-" (Signo)
  const handleSignClick = () => {
    if (display.startsWith('-')) {
      setDisplay(display.slice(1));
      setExpression(expression.slice(1));
    } else {
      setDisplay('-' + display);
      setExpression('-' + expression);
    }
  };

  // Función para manejar el botón "%" (Porcentaje)
  const handlePercentClick = () => {
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
    setExpression(value.toString());
  };

  // Función para manejar el botón "1/x" (Inverso)
  const handleInverseClick = () => {
    const value = 1 / parseFloat(display);
    setDisplay(value.toString());
    setExpression(value.toString());
  };

  // Función para manejar el botón "x^2" (Cuadrado)
  const handleSquareClick = () => {
    const value = Math.pow(parseFloat(display), 2);
    setDisplay(value.toString());
    setExpression(value.toString());
  };

  // Función para manejar el botón "2√x" (Raíz Cuadrada)
  const handleSqrtClick = () => {
    const value = Math.sqrt(parseFloat(display));
    setDisplay(value.toString());
    setExpression(value.toString());
  };

  // Función para borrar el historial
  const handleClearHistory = () => {
    setHistory([]);
  };

  // Efecto para manejar el teclado
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumberClick(e.key);
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperatorClick(e.key);
      } else if (e.key === '.') {
        handleDecimalClick();
      } else if (e.key === 'Enter') {
        handleEqualsClick();
      } else if (e.key === 'Backspace') {
        handleBackspaceClick();
      } else if (e.key === 'Escape') {
        handleClearClick();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [expression]);

  return (
    <div className="calculator">
      {/* Contenedor del Historial y Botón de Borrar Historial */}
      <div className="history-container">
        <div className="history">
          {history.map((item, index) => (
            <div key={index}>
              <span>{item.expression} = {item.result}</span>
            </div>
          ))}
        </div>
        <button id="clear-history" onClick={handleClearHistory}>Borrar Historial</button>
      </div>

      {/* Display */}
      <div id="display" className="display">
        {display}
      </div>

      {/* Botones */}
      <div className="buttons">
        <button id="percent" onClick={handlePercentClick}>%</button>
        <button id="ce" onClick={() => setDisplay('0')}>CE</button>
        <button id="clear" onClick={handleClearClick}>C</button>
        <button id="backspace" onClick={handleBackspaceClick}>Borrar</button>
        <button id="inverse" onClick={handleInverseClick}>1/x</button>
        <button id="square" onClick={handleSquareClick}>x^2</button>
        <button id="sqrt" onClick={handleSqrtClick}>2√x</button>
        <button id="divide" onClick={() => handleOperatorClick('/')}>/</button>
        <button id="seven" onClick={() => handleNumberClick('7')}>7</button>
        <button id="eight" onClick={() => handleNumberClick('8')}>8</button>
        <button id="nine" onClick={() => handleNumberClick('9')}>9</button>
        <button id="multiply" onClick={() => handleOperatorClick('*')}>X</button>
        <button id="four" onClick={() => handleNumberClick('4')}>4</button>
        <button id="five" onClick={() => handleNumberClick('5')}>5</button>
        <button id="six" onClick={() => handleNumberClick('6')}>6</button>
        <button id="subtract" onClick={() => handleOperatorClick('-')}>-</button>
        <button id="one" onClick={() => handleNumberClick('1')}>1</button>
        <button id="two" onClick={() => handleNumberClick('2')}>2</button>
        <button id="three" onClick={() => handleNumberClick('3')}>3</button>
        <button id="add" onClick={() => handleOperatorClick('+')}>+</button>
        <button id="sign" onClick={handleSignClick}>+/-</button>
        <button id="zero" onClick={() => handleNumberClick('0')}>0</button>
        <button id="decimal" onClick={handleDecimalClick}>,</button>
        <button id="equals" onClick={handleEqualsClick}>=</button>
      </div>
    </div>
  );
};

export default Calculator;