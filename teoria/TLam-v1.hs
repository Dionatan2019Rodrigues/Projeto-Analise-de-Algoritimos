module TLam where

import Data.List

data Color = Red | Blue | Green deriving (Show,Eq)

data Term = Var Char
          | Abs Char Term 
          | App Term Term deriving (Show, Eq)


freeVars :: Term -> [Char]
freeVars (Var x) = [x]
freeVars (Abs x t1) = remove x (freeVars t1)
freeVars (App t1 t2) = (freeVars t1)++(freeVars t2)


remove :: Char -> [Char] -> [Char]
remove x [] = []
remove x (h:t) = if (x == h) then t else h:(remove x t)

-- Examples

ex_id = Abs 'x' (Var 'x') 

-- Função de substituição implementada

subs :: Char -> Term -> Term -> Term
subs x s (Var y) = if x == y then s else Var y
subs x s (Abs y t1)
  | x == y    = Abs y t1
  | otherwise = Abs y (subs x s t1)
subs x s (App t1 t2) = App (subs x s t1) (subs x s t2)