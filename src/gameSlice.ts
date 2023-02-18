import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export const fetchValidWords = createAsyncThunk('validWords', async (word, { rejectWithValue }) => {
	const response = await fetch('../validWordList.txt');
	const data = response.text();
	if (response.status < 200 || response.status >= 300) {
		return rejectWithValue(data);
	}
	return data;
});

export const fetchWinningWords = createAsyncThunk('winningWords', async (word, { rejectWithValue }) => {
	const response = await fetch('../winningWordList.txt');
	const data = response.text();
	if (response.status < 200 || response.status >= 300) {
		return rejectWithValue(data);
	}
	return data;
});

export enum GameStatus {
	loading,
	error,
	active,
	win,
	lose,
}

export enum wordListStatus {
	loading,
	error,
	ready,
}

export enum GuessStatuses {
	waiting,
	accepted,
	rejected,
}

export enum GuessReasons {
	ok,
	tooShort,
	notInWordList,
}

export enum LetterStates {
	open, // not yet guessed, available to guess
	incorrect, // guessed, not in word
	correct, // guessed in correct spot
	wrongPosition, // guessed but wrong spot
}

export interface LetterState {
	letter: string;
	state: LetterStates;
}

export interface WordState {
	letters: LetterState[];
}

export interface GuessStatus {
	status: GuessStatuses;
	reason: GuessReasons;
}

export interface GameState {
	wins: number;
	losses: number;
	gameStatus: GameStatus;
	noOfGuesses: number;
	validWords: string[]; // words to check for valid guesses
	validWordsStatus: wordListStatus;
	winningWords: string[]; // list of possible winning words (from teacher/file)
	winningWordsStatus: wordListStatus;
	winningWordsIndex: number; // what word we're on
	wordToGuess: string; // current word to guess, random from winning words (filtering out previous game words)
	wordLength: number;
	answerLetterFrequency: any;
	tempFrequency: any;
	previousGameWords: string[]; // for concurrent games to prevent duplicate rounds
	guesses: WordState[]; // list of guessed words in current game
	currentGuessWord: WordState; // current guess attempt
	currentGuessIndex: number; // current guess row on board
	currentGuessLetterIndex: number; // guess letter position
	currentGuessStatus: GuessStatus;
	alphabet: LetterState[]; // letters and state for keyboard
}

const initialState: GameState = {
	wins: 0,
	losses: 0,
	gameStatus: GameStatus.loading,
	noOfGuesses: 6,
	validWords: [],
	validWordsStatus: wordListStatus.loading,
	winningWords: [],
	winningWordsStatus: wordListStatus.loading,
	winningWordsIndex: -1,
	wordToGuess: '',
	wordLength: 5,
	answerLetterFrequency: null,
	tempFrequency: null,
	previousGameWords: [],
	guesses: [
		{
			letters: [
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
			],
		},
		{
			letters: [
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
			],
		},
		{
			letters: [
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
			],
		},
		{
			letters: [
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
			],
		},
		{
			letters: [
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
			],
		},
		{
			letters: [
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
				{ letter: '', state: LetterStates.open },
			],
		},
	],
	currentGuessWord: {
		letters: [
			{ letter: '', state: LetterStates.open },
			{ letter: '', state: LetterStates.open },
			{ letter: '', state: LetterStates.open },
			{ letter: '', state: LetterStates.open },
			{ letter: '', state: LetterStates.open },
		],
	},
	currentGuessIndex: 0,
	currentGuessLetterIndex: 0,
	currentGuessStatus: { status: GuessStatuses.waiting, reason: GuessReasons.ok },
	alphabet: [
		{ letter: 'A', state: LetterStates.open },
		{ letter: 'B', state: LetterStates.open },
		{ letter: 'C', state: LetterStates.open },
		{ letter: 'D', state: LetterStates.open },
		{ letter: 'E', state: LetterStates.open },
		{ letter: 'F', state: LetterStates.open },
		{ letter: 'G', state: LetterStates.open },
		{ letter: 'H', state: LetterStates.open },
		{ letter: 'I', state: LetterStates.open },
		{ letter: 'J', state: LetterStates.open },
		{ letter: 'K', state: LetterStates.open },
		{ letter: 'L', state: LetterStates.open },
		{ letter: 'M', state: LetterStates.open },
		{ letter: 'N', state: LetterStates.open },
		{ letter: 'O', state: LetterStates.open },
		{ letter: 'P', state: LetterStates.open },
		{ letter: 'Q', state: LetterStates.open },
		{ letter: 'R', state: LetterStates.open },
		{ letter: 'S', state: LetterStates.open },
		{ letter: 'T', state: LetterStates.open },
		{ letter: 'U', state: LetterStates.open },
		{ letter: 'V', state: LetterStates.open },
		{ letter: 'W', state: LetterStates.open },
		{ letter: 'X', state: LetterStates.open },
		{ letter: 'Y', state: LetterStates.open },
		{ letter: 'Z', state: LetterStates.open },
	],
};

const gameSlice = createSlice({
	name: 'wordGame',
	initialState,
	reducers: {
		newGame: (state) => {
			console.log('start new game', state.winningWords.length);

			// increment wins/losses
			if (state.gameStatus === GameStatus.win) state.wins++;
			if (state.gameStatus === GameStatus.lose) state.losses++;
			state.gameStatus = GameStatus.loading;

			// reset some values to the defaults
			state.alphabet = initialState.alphabet;
			state.guesses = initialState.guesses;
			state.currentGuessIndex = initialState.currentGuessIndex;
			state.currentGuessLetterIndex = initialState.currentGuessLetterIndex;

			// grab the next word to guess
			state.winningWordsIndex += 1;
			if (state.winningWordsIndex === state.winningWords.length) state.winningWordsIndex = 0;
			state.wordToGuess = state.winningWords[state.winningWordsIndex];
			state.wordLength = state.wordToGuess.length;

			const freq = [...state.wordToGuess.toUpperCase()].reduce((total: any, letter) => {
				total[letter] ? total[letter]++ : (total[letter] = 1);
				return total;
			}, {});
			state.answerLetterFrequency = freq;
			state.tempFrequency = freq;
			state.gameStatus = GameStatus.active;
		},
		guessLetter: (state, action: PayloadAction<string>) => {
			if (state.currentGuessLetterIndex > state.wordLength) return;

			state.guesses[state.currentGuessIndex].letters[state.currentGuessLetterIndex].letter = action.payload;
			state.guesses[state.currentGuessIndex].letters[state.currentGuessLetterIndex].state = LetterStates.open;
			state.currentGuessLetterIndex += 1;

			state.currentGuessStatus = initialState.currentGuessStatus;
		},
		updateLetterState: (state, action: PayloadAction<{ index: number; state: LetterStates }>) => {
			console.log('guess', state.guesses[state.currentGuessIndex],state.currentGuessIndex)
			const letterData = state.guesses[state.currentGuessIndex].letters[action.payload.index];
			console.log('updating',letterData.letter,letterData.state,action.payload.state)
			letterData.state = action.payload.state;
			const alphIndex = state.alphabet.findIndex((letter) => letter.letter === letterData.letter);
			if (state.alphabet[alphIndex].state !== LetterStates.correct) {
				state.alphabet[alphIndex].state = action.payload.state;
			}
		},
		reduceLetterFrequency: (state, action: PayloadAction<string>) => {
			if (state.answerLetterFrequency[action.payload]) {
				state.answerLetterFrequency[action.payload] -= 1;
			}
			setTempFrequency();
		},
		setTempFrequency: (state) => {
			state.tempFrequency = { ...state.answerLetterFrequency };
		},
		reduceTempFrequency: (state, action: PayloadAction<string>) => {
			if (state.tempFrequency[action.payload]) {
				state.tempFrequency[action.payload] -= 1;
			}
		},
		backspace: (state) => {
			if (state.currentGuessLetterIndex === 0) return;
			state.currentGuessLetterIndex -= 1;
			state.guesses[state.currentGuessIndex].letters[state.currentGuessLetterIndex].letter = '';
			state.currentGuessStatus = initialState.currentGuessStatus;
		},
		updateGuessStatus: (state, action: PayloadAction<GuessStatus>) => {
			state.currentGuessStatus = action.payload;
		},
		updateGameState: (state, action: PayloadAction<GameStatus>) => {
			state.gameStatus = action.payload;
		},
		nextWord: (state) => {
			console.log('next word)')
			state.currentGuessIndex += 1;
			state.currentGuessLetterIndex = 0;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchValidWords.pending, (state, action) => {
			state.validWordsStatus = wordListStatus.loading;
			state.gameStatus = GameStatus.loading;
		});
		builder.addCase(fetchValidWords.fulfilled, (state, action) => {
			console.log('got word list');
			const wordArray = action.payload.split(/\r?\n/);
			state.validWords = wordArray;
			state.validWordsStatus = wordListStatus.ready;
			if (state.winningWordsStatus === wordListStatus.ready) state.gameStatus = GameStatus.active;
		});
		builder.addCase(fetchValidWords.rejected, (state, action) => {
			state.validWordsStatus = wordListStatus.error;
			state.gameStatus = GameStatus.error;
		});

		builder.addCase(fetchWinningWords.pending, (state, action) => {
			state.winningWordsStatus = wordListStatus.loading;
			state.gameStatus = GameStatus.loading;
		});
		builder.addCase(fetchWinningWords.fulfilled, (state, action) => {
			console.log('got answer key');
			const wordArray = action.payload.split(/\r?\n/);
			state.winningWords = wordArray;
			state.winningWordsStatus = wordListStatus.ready;
			if (state.validWordsStatus === wordListStatus.ready) state.gameStatus = GameStatus.active;
		});
		builder.addCase(fetchWinningWords.rejected, (state, action) => {
			state.winningWordsStatus = wordListStatus.error;
			state.gameStatus = GameStatus.error;
		});
	},
});

export const { newGame, nextWord, guessLetter, updateLetterState, reduceLetterFrequency, setTempFrequency, reduceTempFrequency, backspace, updateGuessStatus, updateGameState } = gameSlice.actions;

export default gameSlice;
