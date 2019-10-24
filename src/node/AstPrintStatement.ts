import { Location } from 'earley';
// import { AstVariableReference } from "./AstVariableReference";
import { AstPrintItem } from './AstPrintItem';

export class AstPrintStatement {
  /** @constructor */
  constructor(
    public location: Location,
    public printItems: AstPrintItem[],
    readonly fileNumber?: string
  ) {
    // this.locus = locus;
    // this.printItems = printItems;
  }

  accept(visitor: any) {
    visitor.visitPrintStatement(this);
  }
}
