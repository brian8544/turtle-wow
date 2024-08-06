export enum School {
    Physical = "Physical",
    Holy = "Holy",
    Fire = "Fire",
    Nature = "Nature",
    Frost = "Frost",
    Shadow = "Shadow",
    Arcane = "Arcane"
}

export const ALL_SCHOOLS: Array<School> = [School.Physical, School.Holy, School.Fire, School.Nature,
    School.Frost, School.Shadow, School.Arcane];

export const ALL_SCHOOLS_MASK = 0x7F;

const translation: Array<[School, number]> = [
    [School.Physical, 0x01],
    [School.Holy, 0x02],
    [School.Fire, 0x04],
    [School.Nature, 0x08],
    [School.Frost, 0x10],
    [School.Shadow, 0x20],
    [School.Arcane, 0x40],
];

export function school_mask_to_school_array(school_mask: number): Array<School> {
    const result = [];
    for (const [school, mask] of translation)
        if ((school_mask & mask) > 0)
            result.push(school);
    return result;
}

export function school_array_to_school_mask(school_array: Array<School>): number {
    let result = 0;
    for (const [school, mask] of translation)
        if (school_array.includes(school))
            result |= mask;
    return result;
}
