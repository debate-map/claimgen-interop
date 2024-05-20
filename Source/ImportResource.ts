export class ImportResource {
	static lastID = -1;

	localID = ++ImportResource.lastID;
	/** For a given resource, the sequence of indexes that its ancestors had, within each of their parents' children-lists. (atm only displayed in import-dialog for reference purposes) */
	pathInData: number[];
}
export class IR_NodeAndRevision extends ImportResource {
	constructor(data?: Partial<IR_NodeAndRevision>) {
		super();
		Object.assign(this, data);
	}
	link: NodeLink;
	node: NodeL1;
	revision: NodeRevision;
	CanSearchByTitle() {
		return (this.revision.phrasing.text_base ?? "").trim().length > 0
			//|| (this.revision.phrasing.text_question ?? "").trim().length > 0 // commented, since text_question is no longer needed for sl imports
			|| (this.revision.phrasing.text_narrative ?? "").trim().length > 0;
	}

	// note: this "insert path" has node-titles as its segments, rather than node-ids
	// (each node-id is found by traversing descendants, down from the node that the import command was started from)
	insertPath_titles?: string[]; // used for local import
	insertPath_parentResourceLocalID?: number; // used for server import

	// used to check if the node is already in the map; arguably redundant, but added to ensure uses same title-getting process as for ancestors (through insertPath_titles)
	ownTitle?: string;
}