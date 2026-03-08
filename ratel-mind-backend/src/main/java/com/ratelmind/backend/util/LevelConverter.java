package com.ratelmind.backend.util;

import lombok.experimental.UtilityClass;

@UtilityClass
public final class LevelConverter {

    // Accepts: "Level 3" OR "Level III" OR "Level III (something)"
    public static int levelIndex(String lvl) {
        if (lvl == null) return 0;
        String s = lvl.trim();

        // Arabic
        if (s.startsWith("Level 1")) return 1;
        if (s.startsWith("Level 2")) return 2;
        if (s.startsWith("Level 3")) return 3;
        if (s.startsWith("Level 4")) return 4;
        if (s.startsWith("Level 5")) return 5;

        // Roman
        if (s.startsWith("Level II")) return 2;
        if (s.startsWith("Level III")) return 3;
        if (s.startsWith("Level IV")) return 4;
        if (s.startsWith("Level V")) return 5;

        // "Level I" but NOT II/III/IV
        if (s.startsWith("Level I")) return 1;

        return 0;
    }

}
