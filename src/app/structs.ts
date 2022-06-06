export interface SubEntry {

    username:string;
    // General info
    workout_split:string;
    num_of_sets:number;
    date:string;
    workout_type:string;
    start_time:string;
    end_time:string;
    focus:string;

    // Set 1
    set1_rep:string;
    set1_form:string;
    set1_weight:string;
    // Set 2
    set2_rep:string;
    set2_form:string;
    set2_weight:string;
    // Set 3
    set3_rep:string;
    set3_form:string;
    set3_weight:string;
    // Set 4
    set4_rep:string;
    set4_form:string;
    set4_weight:string;
    // Set 5
    set5_rep:string;
    set5_form:string;
    set5_weight:string;
    // Set 6
    set6_rep:string;
    set6_form:string;
    set6_weight:string;

};

// export const monthDays = new Map([
//     [1, 31],
//     [2, 28],
//     [3, 31],
//     [4, 30],
//     [5, 31],
//     [6, 30],
//     [7, 31],
//     [8, 31],
//     [9, 30],
//     [10, 31],
//     [11, 30],
//     [12, 31]
// ]);

export interface dataQuery{
    date:string,
    type:string,
    split:string,
    option:string,
    username:string,
    progress:string
}

export const monthDays = [31,28,31,30,31,30,31,31,30,31,30,31]