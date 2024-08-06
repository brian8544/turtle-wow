function first_matching_primary_school(school_mask: number): number {
    if (school_mask >= 64)
        return 64;
    if (school_mask >= 32)
        return 32;
    if (school_mask >= 16)
        return 16;
    if (school_mask >= 8)
        return 8;
    if (school_mask >= 4)
        return 4;
    if (school_mask >= 2)
        return 2;
    return 1;
}

export {first_matching_primary_school};
