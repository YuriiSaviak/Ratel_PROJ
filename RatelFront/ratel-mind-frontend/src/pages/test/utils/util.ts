export function getLevelBadgeClass(level: string | null) {
    if (!level) return "levelBadge levelBadge--medium";
    const l = level.toLowerCase();
    if (l.startsWith("high")) return "levelBadge levelBadge--high";
    if (l.startsWith("low")) return "levelBadge levelBadge--low";
    return "levelBadge levelBadge--medium";
}
