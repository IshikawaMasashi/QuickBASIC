export const code_Input = 
`OPEN "SAMPLE1" FOR INPUT AS #1

DO WHILE NOT EOF(#1)
  LINE INPUT #1, l$
  PRINT l$
LOOP
`;