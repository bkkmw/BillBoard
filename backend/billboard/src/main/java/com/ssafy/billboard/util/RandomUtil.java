package com.ssafy.billboard.util;

import java.util.Random;

public class RandomUtil {

    private RandomUtil() {}

    public static String randomAuthKey() {
        char[] authKey = new char[8];
        Random randUtil = new Random();

        for(int i=0; i<8; i++) {
            int randInt = randUtil.nextInt(26);
            authKey[i] = (char)(65 + randInt);
        }
        return new String(authKey);
    }
}
