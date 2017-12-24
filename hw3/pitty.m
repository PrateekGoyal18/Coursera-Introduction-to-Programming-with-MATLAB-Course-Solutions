function c=pitty(ab)
c=sqrt(ab(:,1).^2+ab(:,2).^2);


function c = pitty(ab)
 
    c = sqrt(sum(ab' .^ 2))';
end

Here we use the fact that the function sum works column by column. 
So, transposing and then squaring every element will put the squares of the corresponding a-s and b-s into columns. 
The function sum then adds them up, and sqrt computes each element's square root. 
Finally, we need to transpose the result back into a column vector.