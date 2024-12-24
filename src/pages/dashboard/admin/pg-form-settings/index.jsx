import AskDocument from "./AskDocuments";
import ChurchMembersBodies from "./ChruchMembersBodies";

const PgFormSettings = () => {
    return(
        <div className="flex gap-12">
            <AskDocument />
            <ChurchMembersBodies />
        </div>
    )
}

export default PgFormSettings;