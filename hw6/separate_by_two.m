function[even_ones, odd_ones] = separate_by_two(A)
odd_fin = rem(A,2) ~= 0;
number_odd = A(odd_fin);
number_even = A(~odd_fin);
odd_ones=number_odd';
even_ones=number_even';
end