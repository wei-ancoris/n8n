import { completeFromList } from '@codemirror/autocomplete';
import { LRParser } from '@lezer/lr';
import { foldNodeProp, foldInside, LRLanguage, LanguageSupport } from '@codemirror/language';
import { styleTags, tags } from '@lezer/highlight';

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = LRParser.deserialize({
	version: 14,
	states: "nQQOPOOOOOO'#Cc'#CcOOOO'#Ca'#CaQQOPOOOOOO-E6_-E6_",
	stateData: ']~OQPORPOSPO~O',
	goto: 'cWPPPPPXP_QRORSRTQOR',
	nodeNames: '⚠ Program Plaintext Resolvable BrokenResolvable',
	maxTerm: 7,
	skippedNodes: [0],
	repeatNodeCount: 1,
	tokenData:
		'4f~RRO#o[#o#p{#p~[~aRQ~O#o[#o#pj#p~[~mRO#o[#p~[~~v~{OQ~~!OSO#o[#o#p![#p~[~~v~!a!YS~OX&PX^![^p&Ppq![qr![rs![st![tu![uv![vw![wx![xy![yz![z{![{|![|}![}!O![!O!P![!P!Q![!Q![![![!]![!]!^![!^!_![!_!`![!`!a![!a!b![!b!c![!c!}![!}#O![#O#P&d#P#Q![#Q#R![#R#S![#S#T![#T#o![#o#p![#p#q![#q#r4W#r#s![#s#y&P#y#z![#z$f&P$f$g![$g#BY&P#BY#BZ![#BZ$IS&P$IS$I_![$I_$I|&P$I|$JO![$JO$JT&P$JT$JU![$JU$KV&P$KV$KW![$KW&FU&P&FU&FV![&FV~&P~&URS~O#q&P#q#r&_#r~&P~&dOS~~&i!YS~OX&PX^![^p&Ppq![qr![rs![st![tu![uv![vw![wx![xy![yz![z{![{|![|}![}!O![!O!P![!P!Q![!Q![![![!]![!]!^![!^!_![!_!`![!`!a![!a!b![!b!c![!c!}![!}#O![#O#P&d#P#Q![#Q#R![#R#S![#S#T![#T#o![#o#p![#p#q![#q#r*X#r#s![#s#y&P#y#z![#z$f&P$f$g![$g#BY&P#BY#BZ![#BZ$IS&P$IS$I_![$I_$I|&P$I|$JO![$JO$JT&P$JT$JU![$JU$KV&P$KV$KW![$KW&FU&P&FU&FV![&FV~&P~*^RS~O#q*g#q#r0s#r~*g~*j}X^*gpq*gqr*grs*gst*gtu*guv*gvw*gwx*gxy*gyz*gz{*g{|*g|}*g}!O*g!O!P*g!P!Q*g!Q![*g![!]*g!]!^*g!^!_*g!_!`*g!`!a*g!a!b*g!b!c*g!c!}*g!}#O*g#O#P-g#P#Q*g#Q#R*g#R#S*g#S#T*g#T#o*g#o#p*g#p#q*g#q#r3u#r#s*g#y#z*g$f$g*g#BY#BZ*g$IS$I_*g$I|$JO*g$JT$JU*g$KV$KW*g&FU&FV*g~-j}X^*gpq*gqr*grs*gst*gtu*guv*gvw*gwx*gxy*gyz*gz{*g{|*g|}*g}!O*g!O!P*g!P!Q*g!Q![*g![!]*g!]!^*g!^!_*g!_!`*g!`!a*g!a!b*g!b!c*g!c!}*g!}#O*g#O#P-g#P#Q*g#Q#R*g#R#S*g#S#T*g#T#o*g#o#p*g#p#q*g#q#r0g#r#s*g#y#z*g$f$g*g#BY#BZ*g$IS$I_*g$I|$JO*g$JT$JU*g$KV$KW*g&FU&FV*g~0jRO#q*g#q#r0s#r~*g~0x}R~X^*gpq*gqr*grs*gst*gtu*guv*gvw*gwx*gxy*gyz*gz{*g{|*g|}*g}!O*g!O!P*g!P!Q*g!Q![*g![!]*g!]!^*g!^!_*g!_!`*g!`!a*g!a!b*g!b!c*g!c!}*g!}#O*g#O#P-g#P#Q*g#Q#R*g#R#S*g#S#T*g#T#o*g#o#p*g#p#q*g#q#r3u#r#s*g#y#z*g$f$g*g#BY#BZ*g$IS$I_*g$I|$JO*g$JT$JU*g$KV$KW*g&FU&FV*g~3xRO#q*g#q#r4R#r~*g~4WOR~~4]RS~O#q*g#q#r4R#r~*g',
	tokenizers: [0],
	topRules: { Program: [0, 1] },
	tokenPrec: 0,
});

const parserWithMetaData = parser.configure({
	props: [
		foldNodeProp.add({
			Application: foldInside,
		}),
		styleTags({
			OpenMarker: tags.brace,
			CloseMarker: tags.brace,
			Plaintext: tags.content,
			Resolvable: tags.string,
			BrokenResolvable: tags.className,
		}),
	],
});
const n8nExpressionLanguage = LRLanguage.define({
	parser: parserWithMetaData,
	languageData: {
		commentTokens: { line: ';' },
	},
});
const completions = n8nExpressionLanguage.data.of({
	autocomplete: completeFromList([{ label: 'abcdefg', type: 'keyword' }]),
});
function n8nExpression() {
	return new LanguageSupport(n8nExpressionLanguage, [completions]);
}

export { n8nExpression, n8nExpressionLanguage, parserWithMetaData };
