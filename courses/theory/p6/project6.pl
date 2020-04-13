%p1
mymember(0,[]):- !.
mymember(N, [H|T]) :- N =\= H , mymember(N, T).
mymember(N, [H|T]) :- N =:= H , N is H.

%p2
myeven(X) :- 0 is mod(X, 2).

%p3
myevennumber(0, []):- !.
myevennumber(X, [H|T]) :- myeven(H), myevennumber(X1, T), X is X1+1.
myevennumber(X, [H|T]) :- not(myeven(H)), myevennumber(X, T).

%p4
myminlist([H], H):- !.
myminlist([H | T], H) :- 
	myminlist(T, A1),
	H =< A1, !.
myminlist([_H | T], A) :-
	myminlist(T, A).

%p5
palindrome(L) :- reverse(L,L).

%p6
%T1 = t(a,t(b,t(d,nil,nil),t(e,nil,nil)),t(c,nil,t(f,t(g,nil,nil))))
t(_, nil, nil).
t(_,L,R).

leafcount(t(_, nil, nil), 1) :- !.

leafcount(t(_,L,R),N) :- 
	leafcount(L,N1),
	leafcount(R,N2),
	write('internal\n'),
	N is N1 + N2.

leafcount(t(_,L,nil),N) :-
leafcount(L,N1),
write('internal left\n'),
N is N1.

leafcount(t(_,nil,R),N) :-
leafcount(R,N2),
write('internal right\n'),
N is N2.

% leafcount(t(a,t(b,t(d,nil,nil),t(e,nil,nil)),t(c,nil,t(f,t(g,nil,nil)))),N)