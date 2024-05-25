import React from 'react';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AppStyleSheet } from './types/AppStyleSheet.type';

export default function App(): JSX.Element {
	const [operation, setOperation] = useState<string[]>([]);
	const lastElement: string = operation[operation.length - 1];
	const operatorsList: string[] = [' + ', ' - ', ' x ', ' / '];

	const handlePressBack = (): void => {
		setOperation(operation.slice(0, -1));
	};

	const handlePressClear = (): void => {
		setOperation([]);
	};

	const handlePressNumber = (newNumber: number): void => {
		if (operation.length === 0 || operatorsList.includes(lastElement)) {
			setOperation([...operation, String(newNumber)]);
		} else {
			const updatedLastNumber: string = `${lastElement}${newNumber}`;
			setOperation([...operation.slice(0, -1), updatedLastNumber]);
		}
	};

	const handlePressOperator = (newOperator: string): void => {
		const isThereAlreadyOperator: boolean = operation.some(e => operatorsList.includes(e));
		if (operation.length > 0 && !isThereAlreadyOperator) {
			setOperation([...operation, newOperator]);
		}
	};

	const calculateFunction = (arr: string[]): string => {
		const firstNumber: string = arr[0];
		const operator: string = arr[1];
		const secondNumber: string = arr[2];

		let result: number = 0;

		if (operator === ' + ') {
			result = Number(firstNumber) + Number(secondNumber);
		} else if (operator === ' - ') {
			result = Number(firstNumber) - Number(secondNumber);
		} else if (operator === ' x ') {
			result = Number(firstNumber) * Number(secondNumber);
		} else if (operator === ' / ') {
			result = Number(firstNumber) / Number(secondNumber);
		}

		return String(result);
	};

	const handleCalculate = (): void => {
		const result: string = calculateFunction(operation);
		setOperation([result]);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.show}>
				<Text
					testID={'display'}
					style={styles.showText}
				>
					{operation}
				</Text>
			</View>

			<View style={styles.calculatorContainer}>
				<View>
					<View style={styles.row}>
						<TouchableOpacity
							onPress={(): void => handlePressNumber(1)}
							style={styles.button}
						>
							<Text style={styles.buttonText}>1</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={(): void => handlePressNumber(2)}
							style={styles.button}
						>
							<Text style={styles.buttonText}>2</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={(): void => handlePressNumber(3)}
							style={styles.button}
						>
							<Text style={styles.buttonText}>3</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row}>
						<TouchableOpacity
							onPress={(): void => handlePressNumber(4)}
							style={styles.button}
						>
							<Text style={styles.buttonText}>4</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={(): void => handlePressNumber(5)}
							style={styles.button}
						>
							<Text style={styles.buttonText}>5</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={(): void => handlePressNumber(6)}
							style={styles.button}
						>
							<Text style={styles.buttonText}>6</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row}>
						<TouchableOpacity
							onPress={(): void => handlePressNumber(7)}
							style={styles.button}
						>
							<Text style={styles.buttonText}>7</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={(): void => handlePressNumber(8)}
							style={styles.button}
						>
							<Text style={styles.buttonText}>8</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={(): void => handlePressNumber(9)}
							style={styles.button}
						>
							<Text style={styles.buttonText}>9</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.row}>
						<TouchableOpacity
							onPress={(): void => handlePressNumber(0)}
							style={styles.button}
						>
							<Text style={styles.buttonText}>0</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.operationsRow}>
					<TouchableOpacity
						onPress={(): void => handlePressOperator(' + ')}
						style={styles.operationButton}
					>
						<Text style={styles.colorText}>+</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={(): void => handlePressOperator(' - ')}
						style={styles.operationButton}
					>
						<Text style={styles.colorText}>-</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={(): void => handlePressOperator(' x ')}
						style={styles.operationButton}
					>
						<Text style={styles.colorText}>x</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={(): void => handlePressOperator(' / ')}
						style={styles.operationButton}
					>
						<Text style={styles.colorText}>/</Text>
					</TouchableOpacity>
				</View>
			</View>

			<View style={styles.lastRow}>
				<TouchableOpacity
					onPress={(): void => handlePressBack()}
					style={styles.back}
				>
					<Text style={styles.colorText}>←</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={(): void => handlePressClear()}
					style={styles.clear}
				>
					<Text style={styles.colorText}>Clear</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={(): void => handleCalculate()}
					style={styles.go}
				>
					<Text style={styles.colorText}>=</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles: AppStyleSheet = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8F7FF',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	calculatorContainer: {
		flexDirection: 'row',
	},
	show: {
		alignItems: 'center',
		justifyContent: 'center',
		height: 'auto',
		width: '80%',
		backgroundColor: 'white',
		borderRadius: 50,
	},
	showText: {
		fontSize: 40,
		minHeight: 100,
		width: '80%',
		textAlign: 'center',
		textAlignVertical: 'center',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	operationsRow: {
		flexDirection: 'column',
	},
	lastRow: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	button: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		width: 70,
		height: 70,
		borderRadius: 50,
		backgroundColor: 'white',
	},
	buttonText: {
		fontSize: 30,
	},
	operationButton: {
		backgroundColor: '#56CBF9',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		width: 70,
		height: 70,
		borderRadius: 50,
	},
	back: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		width: 100,
		height: 70,
		borderRadius: 50,
		backgroundColor: 'orange',
	},
	clear: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		width: 100,
		height: 70,
		borderRadius: 50,
		backgroundColor: 'red',
	},
	go: {
		justifyContent: 'center',
		alignItems: 'center',
		margin: 10,
		width: 100,
		height: 70,
		borderRadius: 50,
		backgroundColor: '#21ed98',
	},
	colorText: {
		fontSize: 30,
		color: 'white',
	},
});
