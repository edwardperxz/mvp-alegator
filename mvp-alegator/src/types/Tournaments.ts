export class Tournament {
    id?: string;
    name?: string;
    description_tournament?: string;
    tournament_status?: string;
    shortname?: string;
    place?: string;
    feedback_description?: string;
    round_criteria?: JSON;
    minimum_panel_score?: number;
    missing_feedbacks?: boolean;
    avoid_same_institution?: boolean;
    check_in?: boolean;
    start_date?: string;
    end_date?: string;
    creator?: string;
}

// NOTE: Esto es para que se almacene como JSON en la base de datos, a saber donde se coloca esto ...
// function Criteria_to_json(criteria: Criteria): string {
//     return JSON.stringify(criteria);
// }