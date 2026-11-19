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

-- Função de substituição corrigida para não capturar variáveis ligadas

subs :: Char -> Term -> Term -> Term
subs x s (Var y) = if x == y then s else Var y
subs x s (Abs y t1)
  | x == y    = Abs y t1
  | otherwise = Abs y (subs x s t1)
subs x s (App t1 t2) = App (subs x s t1) (subs x s t2)


-- Testa se é um valor
isVal :: Term -> Bool
isVal (Var y) = True
isVal (Abs x t1) = True
isVal _         = False


-- Semantica: eval - função que avalia um passo de redução em um termo lambda
-- Semantica Operacional call-by-value
eval :: Term -> Term
eval (Var x)     = (Var x)
eval (Abs x t1)  = (Abs x t1)
eval (App (Abs x t12) t2) = if isVal t2 then subs x t2 t12
                            else let t2' = eval t2
                                 in App (Abs x t12) t2'
eval (App t1 t2) = if isVal t1 then let t2' = eval t2
                                    in App t1 t2'
                   else let t1' = eval t1
                        in App t1' t2     

id1 = Abs 'x' (Var 'x')
exemplo1 = App id1 (App id1 (Abs 'z' (App id1 (Var 'z'))))

tru = Abs 't' (Abs 'f' (Var 't'))
fls = Abs 't' (Abs 'f' (Var 'f'))