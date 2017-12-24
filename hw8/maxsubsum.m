function [row,col,numrows,numcols,summa] = maxsubsum(A)
[row, col] = size(A);
overallMaxSum = -inf;
for smColumns = 1 : col
    for smRows = 1 : row
        sumMatrix = conv2(inputMatrix, ones(smRows, smColumns), 'same');
        maxValue = max(sumMatrix);
        if maxValue > overallMaxSum 
            numrows = smRows;
            numcols = smColumns;
        end
    end
end