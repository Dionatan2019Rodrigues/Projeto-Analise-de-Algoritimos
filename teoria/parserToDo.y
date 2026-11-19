{
module ParserToDo where
import Data.Char
}

%name parserlamb
%tokentype { Token }
%error { parseError }

%token
	lam { TokenLam } 
	var { TokenVar $$ }
	'.' { TokenPoint }
	'(' { TokenOB }
	')' { TokenCB }
	
%%

-- regras de producao da gramatica

CalcLamb : lam var '.' CalcLamb        { Abs $2 $4 }
         | App                       { $1 }

App      : App Atom                  { App $1 $2 }
         | Atom                      { $1 }

Atom     : var                       { Var $1 }
         | '(' CalcLamb ')'          { $2 }

{

parseError :: [Token] -> a
parseError b = error "Parse Error"

data Term 
		= Abs Char Term
		| App Term Term
		| Var Char
	deriving Show

data Token 
		= TokenVar Char
		| TokenPoint
		| TokenOB
		| TokenCB
		| TokenLam 
	deriving Show

-- ToDo: implementar a função lexer abaixo
lexer :: String -> [Token]
lexer [] = []
lexer (c:cs)
      | isSpace c = lexer cs
      | isAlpha c = TokenVar c : lexer cs
lexer ('\\':cs) = TokenLam : lexer cs
lexer ('λ':cs)  = TokenLam : lexer cs
lexer ('.':cs)  = TokenPoint : lexer cs
lexer ('(':cs)  = TokenOB : lexer cs
lexer (')':cs)  = TokenCB : lexer cs
lexer (c:_)     = error ("Lexical error: unexpected character " ++ show c)

main = getContents >>= print . parserlamb . lexer

}