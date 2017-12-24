function B = divvy(A, k)
% Allocate the output matrix:
B = A;
% Indices of A that are not multiples of k:
idx = rem(A,k)~=0;
% Multiply those element values by k:
B(idx) = k*A(idx);
end