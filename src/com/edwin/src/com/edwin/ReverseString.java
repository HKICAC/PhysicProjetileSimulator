package com.edwin;



public class ReverseString {

    public static void main(String[] args) {
	// write your code here
        String r= reverse("onononoo9999jcjshfhs");
        System.out.println(r);
    }
    //method
    public static String reverse(String input){
        char [] letters = new char[input.length()];
        int index=0;

        for (int i = input.length()-1; i >= 0; i--){

            letters[index]= input.charAt(i);
            index++;

        }
        String reverse = " ";
        for (int i = 0; i<input.length(); i++){
            reverse = reverse + letters[i];
        }
        return reverse;
    }
}
