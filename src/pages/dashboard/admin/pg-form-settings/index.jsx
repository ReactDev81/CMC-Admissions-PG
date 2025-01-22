import AskDocument from "./AskDocuments";
import ChurchMembersBodies from "./ChruchMembersBodies";
import States from "./States";

const PgFormSettings = () => {
    return(
        <div className="flex flex-wrap gap-12">
            <AskDocument />
            <ChurchMembersBodies />
            <States />
        </div>
    )
}

export default PgFormSettings;