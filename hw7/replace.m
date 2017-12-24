function c = replace(A,c1,c2)
%Input A is a cell vector of strings, c1, c2: two characters
%Output c is a cell vector
%Example: A={ 'XOXO', 'XOXO' }
%         c = replace(A,'X','Y')
[m,n]=size(A); %dimensions of A
for i=1:m
    for j=1:n
        a=length(A{i,j}); %length of each string in A
        for k=1:a
            if A{i,j}(k)==c1
                A{i,j}(k)=c2;
            end
        end
    end
end
c=A;