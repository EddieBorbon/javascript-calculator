import React, { useState, useRef } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');
  const audioRef = useRef(null); // Referencia para el audio

  // Cargar el archivo de audio una sola vez
  if (!audioRef.current) {
    audioRef.current = new Audio('/click-sound.mp3');
  }

  // Función para manejar los números
  const handleNumberClick = (num) => {
    if (display === '0') {
      setDisplay(num);
    } else {
      setDisplay(display + num);
    }
    setExpression(expression + num);
    playSound();
  };

  // Función para manejar los operadores
  const handleOperatorClick = (operator) => {
    setDisplay(operator);
    setExpression(expression + operator);
    playSound();
  };

  // Función para manejar el punto decimal
  const handleDecimalClick = () => {
    if (!display.includes('.')) {
      setDisplay(display + '.');
      setExpression(expression + '.');
    }
    playSound();
  };

  // Función para manejar el botón "C" (Clear)
  const handleClearClick = () => {
    setDisplay('0');
    setExpression('');
    playSound();
  };

  // Función para manejar el botón "=" (Igual)
  const handleEqualsClick = () => {
    try {
      // Usar una biblioteca segura para evaluar expresiones
      const result = eval(expression); // Cambiar por una biblioteca segura
      setDisplay(result.toString());
      setExpression(result.toString());
      playSound();
    } catch (error) {
      setDisplay('Error');
      setExpression('');
    }
  };

  // Función para manejar el botón "Borrar" (Backspace)
  const handleBackspaceClick = () => {
    setDisplay(display.slice(0, -1) || '0');
    setExpression(expression.slice(0, -1));
    playSound();
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
    playSound();
  };

  // Función para manejar el botón "%" (Porcentaje)
  const handlePercentClick = () => {
    const value = parseFloat(display) / 100;
    setDisplay(value.toString());
    setExpression(value.toString());
    playSound();
  };

  // Función para manejar el botón "1/x" (Inverso)
  const handleInverseClick = () => {
    const value = 1 / parseFloat(display);
    setDisplay(value.toString());
    setExpression(value.toString());
    playSound();
  };

  // Función para manejar el botón "x^2" (Cuadrado)
  const handleSquareClick = () => {
    const value = Math.pow(parseFloat(display), 2);
    setDisplay(value.toString());
    setExpression(value.toString());
    playSound();
  };

  // Función para manejar el botón "2√x" (Raíz Cuadrada)
  const handleSqrtClick = () => {
    const value = Math.sqrt(parseFloat(display));
    setDisplay(value.toString());
    setExpression(value.toString());
    playSound();
  };

  // Función para manejar el botón "sin" (Seno)
  const handleSinClick = () => {
    const value = Math.sin(parseFloat(display));
    setDisplay(value.toString());
    setExpression(value.toString());
    playSound();
  };

  // Función para manejar el botón "cos" (Coseno)
  const handleCosClick = () => {
    const value = Math.cos(parseFloat(display));
    setDisplay(value.toString());
    setExpression(value.toString());
    playSound();
  };

  // Función para manejar el botón "tan" (Tangente)
  const handleTanClick = () => {
    const value = Math.tan(parseFloat(display));
    setDisplay(value.toString());
    setExpression(value.toString());
    playSound();
  };

  // Función para manejar el botón "log" (Logaritmo base 10)
  const handleLogClick = () => {
    const value = Math.log10(parseFloat(display));
    setDisplay(value.toString());
    setExpression(value.toString());
    playSound();
  };

  // Función para manejar el botón "ln" (Logaritmo natural)
  const handleLnClick = () => {
    const value = Math.log(parseFloat(display));
    setDisplay(value.toString());
    setExpression(value.toString());
    playSound();
  };

  // Función para manejar el botón "π" (Pi)
  const handlePiClick = () => {
    setDisplay(Math.PI.toString());
    setExpression(expression + Math.PI.toString());
    playSound();
  };

  // Función para manejar el botón "e" (Número de Euler)
  const handleEClick = () => {
    setDisplay(Math.E.toString());
    setExpression(expression + Math.E.toString());
    playSound();
  };

  // Función para reproducir sonido
  const playSound = () => {
    audioRef.current.play();
  };

  return (
    <div className="calculator">
      {/* Display */}
      <div id="display" className="display">
        {display}
      </div>

      {/* Botones */}
      <div className="buttons">
        {/* Fila 1 */}
        <button id="sin" onClick={handleSinClick}>sin</button>
        <button id="percent" onClick={handlePercentClick}>%</button>
        <button id="ce" onClick={() => setDisplay('0')}>CE</button>
        <button id="clear" onClick={handleClearClick}>C</button>
        <button id="backspace" onClick={handleBackspaceClick}>Borrar</button>

        {/* Fila 2 */}
        <button id="cos" onClick={handleCosClick}>cos</button>
        <button id="inverse" onClick={handleInverseClick}>1/x</button>
        <button id="square" onClick={handleSquareClick}>x^2</button>
        <button id="sqrt" onClick={handleSqrtClick}>2√x</button>
        <button id="divide" onClick={() => handleOperatorClick('/')}>/</button>

        {/* Fila 3 */}
        <button id="tan" onClick={handleTanClick}>tan</button>
        <button id="seven" onClick={() => handleNumberClick('7')}>7</button>
        <button id="eight" onClick={() => handleNumberClick('8')}>8</button>
        <button id="nine" onClick={() => handleNumberClick('9')}>9</button>
        <button id="multiply" onClick={() => handleOperatorClick('*')}>X</button>

        {/* Fila 4 */}
        <button id="log" onClick={handleLogClick}>log</button>
        <button id="four" onClick={() => handleNumberClick('4')}>4</button>
        <button id="five" onClick={() => handleNumberClick('5')}>5</button>
        <button id="six" onClick={() => handleNumberClick('6')}>6</button>
        <button id="subtract" onClick={() => handleOperatorClick('-')}>-</button>

        {/* Fila 5 */}
        <button id="ln" onClick={handleLnClick}>ln</button>
        <button id="one" onClick={() => handleNumberClick('1')}>1</button>
        <button id="two" onClick={() => handleNumberClick('2')}>2</button>
        <button id="three" onClick={() => handleNumberClick('3')}>3</button>
        <button id="add" onClick={() => handleOperatorClick('+')}>+</button>

        {/* Fila 6 */}
        <button id="pi" onClick={handlePiClick}>π</button>
        <button id="sign" onClick={handleSignClick}>+/-</button>
        <button id="zero" onClick={() => handleNumberClick('0')}>0</button>
        <button id="decimal" onClick={handleDecimalClick}>,</button>
        <button id="equals" onClick={handleEqualsClick}>=</button>
      </div>
    </div>
  );
};

export default Calculator;