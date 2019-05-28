package spacewar;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class CheckScore {
	
	int [] arrayScore = new int[10];
	String [] arrayPos = new String[10];
	String [] arrayName = new String[10];
	String txtScores = "/SpaceWars/scores.txt";
	BufferedReader br = null;
	int i = 0;
	int j = 0;
	int k = 0;
	
	
	public void checkScore(int score, String name) {
		try {
			readScore();
		} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		while((score > arrayScore[j] && j < 10)) {
			j++;
		}
		if(j <= 10) {
			arrayScore[j - 1] = score;
			saveScore(j, score, name);
		}
	}
	
	
	public void saveScore(int pos, int score, String name) {
		String auxline;
		BufferedWriter writer;
		try {
			writer = new BufferedWriter(new FileWriter(txtScores));

			while(k < pos) {
				auxline = arrayPos[k] + " " + arrayName[k] + " " + arrayScore[k];
				writer.write(auxline);
			}
			auxline = pos + " " + name + " " + score;
			k++;
			while(k > pos && k < 10) {
				auxline = arrayPos[k - 1] + " " + arrayName[k - 1] + " " + arrayScore[k - 1];
			}
			writer.close();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
	}
	
	
	public void readScore() throws NumberFormatException, IOException {
		String line = "";
		String txtSplitBy = " ";
		try {
			br = new BufferedReader(new FileReader(txtScores));
			while ((line = br.readLine()) != null) {
			    String[] lineScore = line.split(txtSplitBy);
			    //El primer elemento es la posicion del jugador, el segundo el nombre, y el tercero la puntuacion
			    arrayPos[i] = lineScore[0];
			    arrayName[i] = lineScore[1];
			    String score = lineScore[2];
			    arrayScore[i] = Integer.parseInt(score);
			    i++;
			}  
		} catch (FileNotFoundException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		
	}
}
