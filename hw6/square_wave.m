%function [yout] = square_wave(n) 
%syms n; 
%f = n^4; 
%df = diff(f); 
%syms t k; 
%f = 1; %//Define frequency here 
%funcSum = (sin(2*pi*(2*k - 1)*f*t) / (2*k - 1)); 
%funcOut = symsum(func, v, start, finish); 
%xsquare = (4/pi) * symsum(funcSum, k, 1, Inf); 
%tVector = 0 : 0.01 : 4*pi; %// Choose a step size of 0.01 
%yout = subs(xsquare, t, tVector); 
%end






function theSum = s_wave(n) 
t = linspace(0, 4*pi, 1001); 
for tIndex = 1 : length(t) 	
    this_t = t(tIndex); 	
    k = 1 : n; 	
    numerator = sin(this_t * (2*k-1)); 	
    denominator = 2 * k - 1; 	
    theSum(tIndex) = sum(numerator ./ denominator); 
end