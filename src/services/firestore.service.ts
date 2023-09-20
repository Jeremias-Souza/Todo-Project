import { firestore } from "@/server/firestore";
import { collection, query, where } from "@firebase/firestore";
import {
  DocumentReference,
  WhereFilterOp,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export default abstract class FirestoreService {
  static filter<T extends object>(
    path: string,
    field: keyof T,
    operator: WhereFilterOp,
    value: unknown
  ) {
    const col = collection(firestore, path);
    return query(col, where(field.toString(), operator, value));
  }

  static insert(path: string, value: object) {
    const col = collection(firestore, path);
    return addDoc(col, value);
  }

  static update(doc: DocumentReference, value: object) {
    return updateDoc(doc, value);
  }

  static delete(doc: DocumentReference) {
    return deleteDoc(doc);
  }
}
